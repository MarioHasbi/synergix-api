const dotenv = require('dotenv')
const env = process.env.NODE_ENV

if (env == 'production') {
	dotenv.config({ path: './.env-production' })
} else if (env == 'staging') {
	dotenv.config({ path: './.env-staging' })
} else {
	dotenv.config({ path: './.env' })
}

const config = {
	env: env,
	timezone: 'Asia/Jakarta',
	port: process.env.PORT || 3000,
	publicDir: process.env.PUBLIC_DIR || './public/', 
	ticketAttachmentDir: process.env.TICKET_ATTACHMENT_DIR || '',
	infoAttachmentDir: process.env.INFO_ATTACHMENT_DIR || '',
	emailInboxAttachmentDir: process.env.EMAIL_INBOX_ATTACHMENT_DIR || '',
	emailOutboxAttachmentDir: process.env.EMAIL_OUTBOX_ATTACHMENT_DIR || '',
	userPhotoDir: process.env.USER_PHOTO_DIR || '',
	ticketAttachmentUrl: process.env.TICKET_ATTACHMENT_URL || '',
	infoAttachmentUrl: process.env.INFO_ATTACHMENT_URL || '',
	emailInboxAttachmentUrl: process.env.EMAIL_INBOX_ATTACHMENT_URL || '',
	emailOutboxAttachmentUrl: process.env.EMAIL_OUTBOX_ATTACHMENT_URL || '',
	userPhotoUrl: process.env.USER_PHOTO_URL || '',
	cookieSecret: process.env.COOKIE_SECRET,
	cookieDomain: process.env.COOKIE_DOMAIN || null,
	db: {
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		host: process.env.DB_HOST || '',
		port: process.env.DB_PORT || 3306,
		name: process.env.DB_NAME || ''
	},
	ami: {
		baseUrl: process.env.AMI_ACTION_URL || '',
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		db: process.env.REDIS_DB,
		password: process.env.REDIS_PASSWORD,
		expire: process.env.REDIS_DATA_DURATION || 3600, // in seconds
		serviceStatus: process.env.REDIS_SERVICE
	},
	jwt: {
		key: process.env.JWT_KEY || 'the_key',
		key_refresh: process.env.JWT_KEY_REFRESH || 'the_key',
		algorithm: process.env.JWT_ALGORITHM || 'HS256',
		live: process.env.JWT_LIVE || 0, // token will apply after this value (in seconds)
		expire: process.env.JWT_EXPIRE || '1h', // token will expire after this value (in seconds or a string describing a time span zeit/ms)
		expire_refresh: process.env.JWT_EXPIRE_REFRESH || '1h', // refresh token will expire after this value (in seconds or a string describing a time span zeit/ms)
	},
	logDir: process.env.LOG_DIR,
	user_level: {
		agent: 1,
		spv: 2
	},
	
	folderNameReport:process.env.FOLDER_NAME_REPORT,
	folderNameVoice:process.env.FOLDER_NAME_VOICE,
	voiceServer: process.env.VOICE_SERVER,
	user_passwd_default:process.env.USER_PASWD_DEFAULT

}

module.exports = config
