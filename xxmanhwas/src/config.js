let BASE_URL = 'https://xxmanhwas.net'

try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}