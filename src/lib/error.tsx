export default function ErrorPage({ message, baseUrl }: { message: string, baseUrl: string }) {
  return (
    <html lang="es">
      <head>
        <base href={baseUrl.replace(/\/$/, "") + "/"}/>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="?file=styles.css"></link>
        <title>Algo salió mal</title>
      </head>
      <body>
        <div className="container">
          <h1>🚨 Ups, algo salió mal</h1>
          <p>{message || "No pudimos cargar la documentación en este momento."}</p>
          {/* <a href="/">Volver al inicio</a> */}
        </div>
      </body>
    </html>
  );
}
