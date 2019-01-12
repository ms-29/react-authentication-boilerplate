-- Extension
CREATE EXTENSION pgcrypto SCHEMA auth_public

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