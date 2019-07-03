-- Extension
CREATE EXTENSION pgcrypto SCHEMA auth_public

-- Role
CREATE ROLE role_auth_public
CREATE ROLE role_auth_private

-- Type
CREATE TYPE auth_public.jwt_token as (
	role text,
	exp integer,
	user_id integer
);

-- Table
CREATE TABLE auth_public.user (
  user_id SERIAL NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

-- Smart Comment
COMMENT ON COLUMN auth_public.user.password_hash is E'@omit';
COMMENT ON TABLE auth_public.user is E'@omit create';

-- Function
CREATE FUNCTION auth_public.register_user(
  email TEXT,
  password TEXT
) RETURNS auth_public.user AS $$
DECLARE
  new_user auth_public.user;
BEGIN
  INSERT INTO auth_public.user
	(
	  email,
	  password_hash
	)
	VALUES
	(
	  email,
	  auth_public.CRYPT(password, auth_public.GEN_SALT('bf'))
	)
  RETURNING * INTO new_user;
				  
  RETURN new_user;
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;


CREATE OR REPLACE FUNCTION auth_public.authenticate (
	email text,
	password text
) RETURNS auth_public.jwt_token as $$
DECLARE
	user_account auth_public.user;
BEGIN
	SELECT us.* 
	INTO user_account
	FROM auth_public.user as us
	WHERE us.email = authenticate.email;
	
	IF user_account.password_hash = auth_public.CRYPT(authenticate.password, user_account.password_hash) THEN
		RETURN (
			'role_auth_private',
			ROUND(EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days')),
			user_account.user_id
		)::auth_public.jwt_token;
	ELSE
		RETURN NULL;
	END IF;	
	
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER


CREATE FUNCTION auth_public.current_user_id (
) RETURNS integer AS $$
DECLARE
  user_id integer;
BEGIN
  SELECT CURRENT_SETTING('jwt.claims.user_id', true)::integer into user_id;
  
  RETURN user_id;
END
$$ LANGUAGE PLPGSQL STABLE;


CREATE FUNCTION auth_public.viewer (
) RETURNS auth_public.user AS $$
DECLARE
  user_account auth_public.user;
BEGIN
  SELECT us.*
  INTO user_account
  FROM auth_public.user us
  WHERE us.user_id = auth_public.current_user_id();
  
  RETURN user_account;
END
$$ LANGUAGE PLPGSQL STABLE;


-- Grant Permission
GRANT USAGE ON SCHEMA auth_public TO role_auth_public, role_auth_private;
GRANT SELECT ON TABLE auth_public.user TO role_auth_private
