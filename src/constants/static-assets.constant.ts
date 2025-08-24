import path from "path";

/**
 * Exported configuration object containing static asset paths.
 * `publicStatic` resolves to the absolute path of the public directory,
 * typically used for serving static files like images, CSS, or client-side JS.
 */
export default {
    /**
     * Resolves to the /public folder relative to current file
     */
    publicStatic: path.join(__dirname, "../../public")
};
