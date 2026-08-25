document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================
           ELEMENTS
        ================================= */

        const imageInput =
            document.getElementById("imageInput");

        const labelImage =
            document.getElementById("labelImage");

        const label =
            document.getElementById("label");


        const netInput =
            document.getElementById("netInput");

        const grossInput =
            document.getElementById("grossInput");

        const productInput =
            document.getElementById("productInput");


        const netText =
            document.getElementById("netText");

        const grossText =
            document.getElementById("grossText");

        const productText =
            document.getElementById("productText");


        const netPositionBtn =
            document.getElementById(
                "netPositionBtn"
            );

        const grossPositionBtn =
            document.getElementById(
                "grossPositionBtn"
            );

        const productPositionBtn =
            document.getElementById(
                "productPositionBtn"
            );

        const cancelPositionBtn =
            document.getElementById(
                "cancelPositionBtn"
            );


        const textSize =
            document.getElementById(
                "textSize"
            );

        const sizeValue =
            document.getElementById(
                "sizeValue"
            );


        const downloadBtn =
            document.getElementById(
                "downloadBtn"
            );

        const shareBtn =
            document.getElementById(
                "shareBtn"
            );

        const printBtn =
            document.getElementById(
                "printBtn"
            );

        const resetBtn =
            document.getElementById(
                "resetBtn"
            );


        const status =
            document.getElementById(
                "status"
            );


        const netPos =
            document.getElementById(
                "netPos"
            );

        const grossPos =
            document.getElementById(
                "grossPos"
            );

        const productPos =
            document.getElementById(
                "productPos"
            );


        /* =================================
           DATA
        ================================= */

        let positions = {

            net: null,

            gross: null,

            product: null

        };


        let currentMode = null;


        let labelWidth = 800;

        let labelHeight = 500;


        /* =================================
           UPLOAD IMAGE
        ================================= */

        imageInput.addEventListener(
            "change",
            function () {

                const file =
                    imageInput.files[0];

                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        labelImage.src =
                            event.target.result;

                        status.textContent =
                            "Label loaded. Select a position button and click on the label.";

                    };


                reader.readAsDataURL(file);

            }
        );


        /* =================================
           IMAGE LOADED
        ================================= */

        labelImage.onload =
            function () {

                const ratio =
                    labelImage.naturalWidth /
                    labelImage.naturalHeight;


                labelWidth = 800;

                labelHeight =
                    labelWidth / ratio;


                label.style.width =
                    labelWidth + "px";


                label.style.height =
                    labelHeight + "px";


                positions = {

                    net: null,

                    gross: null,

                    product: null

                };


                removeMarkers();

                hideAllText();


                updatePositionInfo();

            };


        /* =================================
           ENTER TEXT
        ================================= */

        function updateText() {

            netText.textContent =
                netInput.value;


            grossText.textContent =
                grossInput.value;


            productText.textContent =
                productInput.value;


            updateVisibility();

        }


        netInput.addEventListener(
            "input",
            updateText
        );


        grossInput.addEventListener(
            "input",
            updateText
        );


        productInput.addEventListener(
            "input",
            updateText
        );


        /* =================================
           TEXT SIZE
        ================================= */

        function updateTextSize() {

            const size =
                Number(textSize.value);


            netText.style.fontSize =
                size + "px";


            grossText.style.fontSize =
                size + "px";


            productText.style.fontSize =
                size + "px";


            sizeValue.textContent =
                size;

        }


        textSize.addEventListener(
            "input",
            updateTextSize
        );


        /* =================================
           POSITION MODE
        ================================= */

        function setMode(mode) {

            currentMode = mode;


            netPositionBtn.classList.remove(
                "active"
            );

            grossPositionBtn.classList.remove(
                "active"
            );

            productPositionBtn.classList.remove(
                "active"
            );


            if (mode === "net") {

                netPositionBtn.classList.add(
                    "active"
                );

                status.textContent =
                    "Click on the label where the NET WEIGHT value should appear.";

            }


            if (mode === "gross") {

                grossPositionBtn.classList.add(
                    "active"
                );

                status.textContent =
                    "Click on the label where the G.WT value should appear.";

            }


            if (mode === "product") {

                productPositionBtn.classList.add(
                    "active"
                );

                status.textContent =
                    "Click on the label where the P.WT value should appear.";

            }

        }


        netPositionBtn.addEventListener(
            "click",
            function () {

                setMode("net");

            }
        );


        grossPositionBtn.addEventListener(
            "click",
            function () {

                setMode("gross");

            }
        );


        productPositionBtn.addEventListener(
            "click",
            function () {

                setMode("product");

            }
        );


        cancelPositionBtn.addEventListener(
            "click",
            function () {

                currentMode = null;

                removeActiveButtons();

                status.textContent =
                    "Position mode cancelled.";

            }
        );


        /* =================================
           CLICK ON LABEL
        ================================= */

        label.addEventListener(
            "click",
            function (event) {

                if (!currentMode) {
                    return;
                }


                /*
                 * Mouse position relative
                 * to label.
                 */

                const rect =
                    label.getBoundingClientRect();


                const scaleX =
                    labelWidth /
                    rect.width;


                const scaleY =
                    labelHeight /
                    rect.height;


                const clickX =
                    (
                        event.clientX -
                        rect.left
                    ) * scaleX;


                const clickY =
                    (
                        event.clientY -
                        rect.top
                    ) * scaleY;


                /*
                 * Save position
                 * relative to label.
                 */

                positions[currentMode] = {

                    x: clickX,

                    y: clickY

                };


                /*
                 * Show text.
                 */

                showText(
                    currentMode
                );


                /*
                 * Show marker.
                 */

                addMarker(
                    clickX,
                    clickY
                );


                updatePositionInfo();


                status.textContent =
                    currentMode.toUpperCase() +
                    " position saved. You can select another field.";


                currentMode = null;

                removeActiveButtons();

            }
        );


        /* =================================
           SHOW TEXT
        ================================= */

        function showText(type) {

            if (type === "net") {

                netText.style.display =
                    "block";

                netText.style.left =
                    positions.net.x + "px";

                netText.style.top =
                    positions.net.y + "px";

            }


            if (type === "gross") {

                grossText.style.display =
                    "block";

                grossText.style.left =
                    positions.gross.x + "px";

                grossText.style.top =
                    positions.gross.y + "px";

            }


            if (type === "product") {

                productText.style.display =
                    "block";

                productText.style.left =
                    positions.product.x + "px";

                productText.style.top =
                    positions.product.y + "px";

            }

        }


        /* =================================
           UPDATE TEXT POSITIONS
        ================================= */

        function updateVisibility() {

            if (positions.net) {

                netText.style.display =
                    "block";

                netText.style.left =
                    positions.net.x + "px";

                netText.style.top =
                    positions.net.y + "px";

            }


            if (positions.gross) {

                grossText.style.display =
                    "block";

                grossText.style.left =
                    positions.gross.x + "px";

                grossText.style.top =
                    positions.gross.y + "px";

            }


            if (positions.product) {

                productText.style.display =
                    "block";

                productText.style.left =
                    positions.product.x + "px";

                productText.style.top =
                    positions.product.y + "px";

            }

        }


        /* =================================
           MARKER
        ================================= */

        function addMarker(x, y) {

            removeMarkers();


            const marker =
                document.createElement(
                    "div"
                );


            marker.className =
                "position-marker";


            marker.style.left =
                x + "px";


            marker.style.top =
                y + "px";


            marker.dataset.marker =
                "true";


            label.appendChild(marker);

        }


        function removeMarkers() {

            const markers =
                label.querySelectorAll(
                    ".position-marker"
                );


            markers.forEach(
                marker =>
                    marker.remove()
            );

        }


        /* =================================
           HIDE TEXT
        ================================= */

        function hideAllText() {

            netText.style.display =
                "none";

            grossText.style.display =
                "none";

            productText.style.display =
                "none";

        }


        /* =================================
           BUTTON STATE
        ================================= */

        function removeActiveButtons() {

            netPositionBtn.classList.remove(
                "active"
            );

            grossPositionBtn.classList.remove(
                "active"
            );

            productPositionBtn.classList.remove(
                "active"
            );

        }


        /* =================================
           POSITION INFORMATION
        ================================= */

        function updatePositionInfo() {

            if (positions.net) {

                netPos.textContent =
                    Math.round(
                        positions.net.x
                    ) +
                    ", " +
                    Math.round(
                        positions.net.y
                    );

            } else {

                netPos.textContent =
                    "Not set";

            }


            if (positions.gross) {

                grossPos.textContent =
                    Math.round(
                        positions.gross.x
                    ) +
                    ", " +
                    Math.round(
                        positions.gross.y
                    );

            } else {

                grossPos.textContent =
                    "Not set";

            }


            if (positions.product) {

                productPos.textContent =
                    Math.round(
                        positions.product.x
                    ) +
                    ", " +
                    Math.round(
                        positions.product.y
                    );

            } else {

                productPos.textContent =
                    "Not set";

            }

        }


        /* =================================
           CREATE FINAL IMAGE
        ================================= */

        function createFinalCanvas() {

            if (
                !labelImage.naturalWidth
            ) {

                alert(
                    "Please upload a label image first."
                );

                return null;
            }


            const canvas =
                document.createElement(
                    "canvas"
                );


            const ctx =
                canvas.getContext(
                    "2d"
                );


            const imageWidth =
                labelImage.naturalWidth;


            const imageHeight =
                labelImage.naturalHeight;


            canvas.width =
                imageWidth;


            canvas.height =
                imageHeight;


            /*
             * Original label
             */

            ctx.drawImage(

                labelImage,

                0,

                0,

                imageWidth,

                imageHeight

            );


            /*
             * Scale from editor
             * coordinates to
             * original image.
             */

            const sx =
                imageWidth /
                labelWidth;


            const sy =
                imageHeight /
                labelHeight;


            const fontSize =
                Number(
                    textSize.value
                );


            ctx.font =
                "bold " +
                Math.round(
                    fontSize * sx
                ) +
                "px Arial";


            ctx.fillStyle =
                "#111";


            ctx.textBaseline =
                "top";


            /*
             * NET
             */

            if (
                positions.net &&
                netInput.value
            ) {

                ctx.fillText(

                    netInput.value,

                    positions.net.x * sx,

                    positions.net.y * sy

                );

            }


            /*
             * GROSS
             */

            if (
                positions.gross &&
                grossInput.value
            ) {

                ctx.fillText(

                    grossInput.value,

                    positions.gross.x * sx,

                    positions.gross.y * sy

                );

            }


            /*
             * PRODUCT
             */

            if (
                positions.product &&
                productInput.value
            ) {

                ctx.fillText(

                    productInput.value,

                    positions.product.x * sx,

                    positions.product.y * sy

                );

            }


            return canvas;

        }


        /* =================================
           DOWNLOAD
        ================================= */

        downloadBtn.addEventListener(
            "click",
            function () {

                const canvas =
                    createFinalCanvas();


                if (!canvas) {
                    return;
                }


                canvas.toBlob(
                    function (blob) {

                        const url =
                            URL.createObjectURL(
                                blob
                            );


                        const link =
                            document.createElement(
                                "a"
                            );


                        link.href =
                            url;


                        link.download =
                            "Jewellery-Label.png";


                        link.click();


                        URL.revokeObjectURL(
                            url
                        );

                    },
                    "image/png"
                );

            }
        );


        /* =================================
           SHARE / SEND TO iPRINT
        ================================= */

        shareBtn.addEventListener(
            "click",
            async function () {

                const canvas =
                    createFinalCanvas();


                if (!canvas) {
                    return;
                }


                canvas.toBlob(
                    async function (blob) {

                        const file =
                            new File(

                                [blob],

                                "Jewellery-Label.png",

                                {
                                    type:
                                        "image/png"
                                }

                            );


                        /*
                         * Android phones can
                         * show compatible apps
                         * in the Share menu.
                         */

                        if (
                            navigator.share &&
                            navigator.canShare &&
                            navigator.canShare({
                                files: [file]
                            })
                        ) {

                            try {

                                await navigator.share({

                                    title:
                                        "Jewellery Label",

                                    text:
                                        "Print this jewellery label",

                                    files: [file]

                                });

                            }

                            catch (error) {

                                console.log(
                                    "Share cancelled"
                                );

                            }

                        }

                        else {

                            alert(
                                "Your browser does not support direct image sharing. Download the label and open it in iPrint."
                            );

                        }

                    },
                    "image/png"
                );

            }
        );


        /* =================================
           PRINT
        ================================= */

        printBtn.addEventListener(
            "click",
            function () {

                const canvas =
                    createFinalCanvas();


                if (!canvas) {
                    return;
                }


                const image =
                    canvas.toDataURL(
                        "image/png"
                    );


                const printWindow =
                    window.open(
                        "",
                        "_blank"
                    );


                printWindow.document.write(`

                    <html>

                    <head>

                        <title>
                            Jewellery Label
                        </title>

                        <style>

                            html,
                            body {

                                margin: 0;

                                padding: 0;

                                background: white;

                            }

                            img {

                                width: 100%;

                                height: auto;

                                display: block;

                            }

                        </style>

                    </head>

                    <body>

                        <img
                            src="${image}"
                        >

                        <script>

                            window.onload =
                            function() {

                                window.print();

                            };

                        <\/script>

                    </body>

                    </html>

                `);


                printWindow.document.close();

            }
        );


        /* =================================
           RESET
        ================================= */

        resetBtn.addEventListener(
            "click",
            function () {

                positions = {

                    net: null,

                    gross: null,

                    product: null

                };


                netInput.value = "";

                grossInput.value = "";

                productInput.value = "";


                hideAllText();

                removeMarkers();

                updatePositionInfo();


                status.textContent =
                    "All positions cleared.";

            }
        );


        /* =================================
           INITIALIZE
        ================================= */

        updateText();

        updateTextSize();

    }
);