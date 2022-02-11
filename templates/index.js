/**
 *
 * @param {*} content pre-rendered content by hCard
 * @param {*} hCardProps initial props
 * @returns html string
 *
 * html template used to implement server side rendering,
 * which takes a pre-rendered content and a initial props as params
 */
module.exports = function (content, hCardProps) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Live hCard Preview</title>

            <link href="css/bootstrap.min.css" rel="stylesheet" />
            <link href="css/main.css" rel="stylesheet" />
        </head>

        <body>
            <div class="HcardApp">${content}</div>
            <script src="https://unpkg.com/react@15/dist/react.js"></script>
            <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
            <script src="main.js"></script>
            <script>
            (function () {
                ReactDOM.render(
                    React.createElement(window.hCard.default, ${JSON.stringify(
                      hCardProps
                    )}),
                    document.querySelector(".HcardApp")
                );
            })();
            </script>
        </body>
        </html>
    `
}
