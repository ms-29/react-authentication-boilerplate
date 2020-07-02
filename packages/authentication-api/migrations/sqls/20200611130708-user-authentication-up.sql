/* Replace with your SQL commands */
CREATE EXTENSION pgcrypto;

CREATE SCHEMA IF NOT EXISTS auth_public;

GRANT USAGE ON SCHEMA auth_public TO role_auth_public, role_auth_private;

CREATE TABLE auth_public.user (
  user_id SERIAL NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

COMMENT ON COLUMN auth_public.user.password_hash is E'@omit';
COMMENT ON TABLE auth_public.user is E'@omit create';

GRANT SELECT ON TABLE auth_public.user TO role_auth_public, role_auth_private;

CREATE FUNCTION auth_public.register_user(
  email TEXT,
  password TEXT
) RETURNS auth_public.user AS $$
DECLARE
  new_user auth_public.user;
BEGIN
  INSERT INTO auth_public.user
	(email, password_hash)
	  VALUES (email, CRYPT(password, GEN_SALT('bf')))
  RETURNING * INTO new_user;
				  
  RETURN new_user;
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth_public.authenticate (
  email text,
  password text
) RETURNS auth_public.user as $$
DECLARE
  user_account auth_public.user;
BEGIN
  SELECT us.* 
  INTO user_account
  FROM auth_public.user as us
  WHERE us.email = authenticate.email;
	
  IF user_account.password_hash = CRYPT(authenticate.password, user_account.password_hash) THEN
    RETURN user_account;
  ELSE
	  RETURN NULL;
  END IF;	
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

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
