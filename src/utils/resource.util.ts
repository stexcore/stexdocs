export default {

    source(url: string) {
        if(/https?:\/\//.test(url)) {
            return url;
        }
        return `?file=${encodeURIComponent(url)}`
    },

    favicon(url?: string) {
        return this.source(url || "favicon.png");
    }
    
}