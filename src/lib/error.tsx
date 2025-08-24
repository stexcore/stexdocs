/**
 * ErrorPage component — renders a styled fallback HTML page when SSR fails.
 * Uses baseUrl for relative asset resolution and displays a custom error message.
 *
 * @param message Optional error message to display
 * @param baseUrl Base URL used for resolving relative paths
 */
export default function ErrorPage({ message, baseUrl }: { message?: string; baseUrl: string }) {
  return (
    <html lang="es">
      <head>
        {/* Ensure relative paths resolve correctly */}
        <base href={baseUrl.replace(/\/$/, "") + "/"} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Load global styles */}
        <link rel="stylesheet" href="?file=styles.css" />
        <title>Error</title>
        <style>{`
          .error-wrapper {
            max-width: 600px;
            margin: 4rem auto;
            padding: 2rem;
            background-color: var(--bg-page);
            border: 1px solid #e2e8f0;
            border-radius: var(--radius);
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            text-align: center;
          }

          .error-wrapper h1 {
            font-size: 1.5rem;
            color: var(--accent);
            margin-bottom: 0.5rem;
          }

          .error-wrapper p {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
          }

          .error-wrapper a {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            background-color: var(--accent);
            color: #fff;
            text-decoration: none;
            border-radius: var(--radius);
            font-size: 0.85rem;
            transition: background 0.2s ease;
          }

          .error-wrapper a:hover {
            background-color: #5a60d1;
          }
        `}</style>
      </head>
      <body>
        <main className="error-wrapper">
          <h1>🚨 Oops! Something went wrong</h1>
          <p>{message || "We couldn't load the documentation at this time. Please try again later."}</p>
        </main>
      </body>
    </html>
  );
}