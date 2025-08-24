import { NextFunction, Response } from "express";
import path from "path";
import fs from "fs";
import mime from "mime-types";

/**
 * Middleware to serve static files from multiple root directories.
 * It attempts to locate and stream the requested file from the first matching root.
 *
 * @param roots Array of root directories to search
 * @param file Relative path of the requested file
 * @param res Express response object
 * @param next Callback to pass control to the next middleware if file is not found
 */
export const serveStatic = (roots: string[], file: string, res: Response, next: NextFunction) => {

    /**
     * Attempts to serve the file from the root at the given index.
     * If not found or invalid, recursively tries the next root.
     *
     * @param index Current index in the roots array
     */
    const tryNextRoot = (index: number) => {
        // If all roots have been tried, delegate to the next middleware
        if (index >= roots.length) return next();

        const root = roots[index];
        const filePath = path.join(root, file);

        // Security check: prevent path traversal attacks
        if (!filePath.startsWith(path.resolve(root))) {
            res.status(403).send('Forbidden');
            return;
        }

        // Check if the file exists and is a regular file
        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                // If not found or not a file, try the next root
                return tryNextRoot(index + 1);
            }

            // Determine MIME type for proper Content-Type header
            const contentType = mime.lookup(filePath) || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);

            // Stream the file to the response
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        });
    };

    // Start trying from the first root
    tryNextRoot(0);
};