
// Registro de usuario.
// export const ABRIR_FORMULARIO_REGISTRO = 'abrir_formulario_registro',
// CERRAR_FORMULARIO_REGISTRO = 'cerrar_formulario_registro',

// RESET_REGISTER_FORM = 'reset_register_form'
	
	// Registro de usuario.
export const REGISTRAR_USUARIO_REQUEST = 'registrar_usuario_request'
export const REGISTRAR_USUARIO_EXITO = 'registrar_usuario_exito'
export const REGISTRAR_USUARIO_FALLO = 'registrar_usuario_fallo'

	// Autenticación de usuario.
export const AUTENTICAR_USUARIO_REQUEST = 'autenticar_usuario_request'
export const AUTENTICAR_USUARIO_EXITO = 'autenticar_usuario_exito'
export const AUTENTICAR_USUARIO_FALLO = 'autenticar_usuario_fallo'

	// Obtiene los datos del usuario desde el servidor.
export const VERIFICAR_TOKEN_USUARIO_REQUEST = 'verificar_token_usuario_request'
export const VERIFICAR_TOKEN_USUARIO_EXITO = 'verificar_token_usuario_exito'
export const VERIFICAR_TOKEN_USUARIO_FALLO = 'verificar_token_usuario_fallo'

	// Para cuando el usuario cierra sesión.
export const SALIR_USUARIO = 'salir_usuario'

	// Listar todos los usuarios registrados.
export const LISTAR_USUARIOS_REQUEST = 'listar_usuarios_request'
export const LISTAR_USUARIOS_EXITO = 'listar_usuarios_exito'
export const LISTAR_USUARIOS_FALLO = 'listar_usuarios_fallo'


// VerificaciÃ³n del correo.
// VERIFY_EMAIL = 'verify_email',
export const VERIFY_EMAIL_FAILURE = 'verify_email_failure',
VERIFICAR_CORREO_CARGANDO = 'verificar_correo_cargando',

// AutenticaciÃ³n de usuario.
// ABRIR_FORMULARIO_AUT = 'abrir_formulario_aut',
// CERRAR_FORMULARIO_AUT = 'cerrar_formulario_aut',

VALIDATE_LOGIN_FORM = 'validate_login_form',

RESET_LOGIN_FORM = 'reset_login_form',

// AUT_USUARIO = 'auth_usuario',
// AUT_USUARIO_CARGANDO = 'auth_usuario_cargando',
AUTH_USER = 'auth_user',
AUTH_USER_FAILURE = 'auth_user_failure',

// Cierre de sesiÃ³n.
USER_LOGOUT = 'user_logout',

// Reenviar verificaciÃ³n de correo.
ABRIR_FORMULARIO_VERIFICACION = 'abrir_formulario_verificacion',
CERRAR_FORMULARIO_VERIFICACION = 'cerrar_formulario_verificacion',

REENVIAR_VERIFICACION = 'reenviar_verificacion',
REENVIAR_VERIFICACION_CARGANDO = 'reenviar_verificacion_cargando',
REENVIAR_VERIFICACION_FALLO = 'reenviar_verificacion_fallo',

// Recuperar contraseÃ±a.
// ABRIR_FORMULARIO_RECUPERAR = 'abrir_formulario_recuperar',
// CERRAR_FORMULARIO_RECUPERAR = 'cerrar_formulario_recuperar',

VALIDATE_FORGOT_PASSWORD_FORM = 'validate_forgot_password_form',

RESET_FORGOT_PASSWORD_FORM = 'reset_forgot_password_form',

// FORGOT_PASSWORD  = 'forgot_password',

FORGOT_PASSWORD_FAILURE = 'forgot_password_failure',

// Verificar el token para poner una nueva contraseÃ±a.
VALIDATE_NEW_PASSWORD_FORM = 'validate_new_password_form',
VERIFY_TOKEN_FAILURE = 'verify_token_failure'


// Perfil del usuario.
// export const OPEN_FORM_EDIT = 'open_form_edit',
// CLOSE_FORM_EDIT = 'close_form_edit',

// SHOW_USER = 'show_user',
// SHOW_USER_FAILURE = 'show_user_failure',


// EDIT_USER = 'edit_user',
// EDIT_USER_FAILURE = 'edit_user_failure