export default {
    parseCookies(cookieHeader: string | undefined): Record<string, string> {
        if (!cookieHeader) return {};
        return Object.fromEntries(
            cookieHeader
                .split(";")
                .map((c) => c.trim().split("="))
                .map(([key, ...val]) => [key, decodeURIComponent(val.join("="))])
        );
    }
}