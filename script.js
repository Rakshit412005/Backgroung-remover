let imageUrl;
    function handleUpload() {
        const fileInput = document.getElementById('file');
        // fileInput.click();
        const image = fileInput.files[0];
        const apiKey = 'QosKPKX1Ga5hP33GRqp213Xe';
        const formData = new FormData();
        formData.append('image_file', image);
        formData.append('size', 'auto');
        document.getElementById("upload-img").style.display = "none";
        document.getElementById("upload-ani").style.display = "flex";

        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                return Promise.reject('something went wrong');
            }
        }).then(blob => {
            console.log(blob);
            const url = URL.createObjectURL(blob);
            imageUrl = url;
            const imgElement = document.createElement('img');
            imgElement.src = url;
            console.log(url);
            document.getElementById("output").scrollIntoView({ behavior: "smooth" });
            // document.getElementById('output-image').appendChild(imgElement);

            loadImage(imageUrl);


        }).catch(error => {
            console.error(error);
        });

        console.log("hello");

    }


    function loadImage(url) {
        var c = document.getElementById("canvas");
         var ctx = c.getContext("2d");
         var image = new Image();
         image.onload = function() {
            ctx.drawImage(image, 0, 0);
         };
         image.src = url;
        }

    function downloadFile() {
        // alert("Hello! I am an alert box!!");

        var anchorElement = document.createElement('a');
        anchorElement.href = imageUrl;
        anchorElement.download = 'edited-image.png'; // Corrected variable name
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement); // Corrected variable name for removal
    }


    //canvas code

    document.addEventListener("DOMContentLoaded", function () {
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');
			const brushWidth = document.getElementById('brushWidth');
			
			let isDrawing = false;

			canvas.addEventListener('mousedown', startDrawing);
			canvas.addEventListener('mouseup', endDrawing);
            canvas.addEventListener('mouseup', reUpload);
			canvas.addEventListener('mousemove', draw);

			function startDrawing(e) {
				ctx.beginPath();
				ctx.moveTo(e.offsetX, e.offsetY);
				isDrawing = true;
			}

			function endDrawing() {
				ctx.closePath();
				isDrawing = false;
			}

			function draw(e) {
				if (!isDrawing) return;
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.strokeStyle = "#EE4B2B";
				ctx.lineWidth = brushWidth.value;
				ctx.globalAlpha = "2" / 100;
                
				ctx.stroke();
			}
		});


        // Resize canvas
        const canvas = document.getElementById('canvas');
        const parent = document.getElementById('output-image');

        function resizeCanvas() {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);


        function reUpload(){
            const fileInput = document.getElementById('canvas');
        // fileInput.click();
        const image = fileInput.files[0];
        const apiKey = 'QosKPKX1Ga5hP33GRqp213Xe';
        const formData = new FormData();
        formData.append('image_file', image);
        formData.append('size', 'auto');
        document.getElementById("upload-img").style.display = "none";
        document.getElementById("upload-ani").style.display = "flex";

        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                return Promise.reject('something went wrong');
            }
        }).then(blob => {
            console.log(blob);
            const url = URL.createObjectURL(blob);
            imageUrl = url;
            const imgElement = document.createElement('img');
            imgElement.src = url;
            document.getElementById("output").scrollIntoView({ behavior: "smooth" });
            document.getElementById('output-image').appendChild(imgElement);

            document.body.appendChild(img);



        }).catch(error => {
            console.error(error);
        });

        console.log("hello");
        }