// // Array of image URLs
// const images = [
//     'src/images/image1.jpg',
//     'src/images/image2.JPG',
//     'src/images/image3.jpg',
//     'src/images/image4.jpg',
//     'src/images/image5.jpg',
//     'src/images/image6.jpeg'
// ];

// // Select the collage container
// const collage = document.querySelector('.collage');
// let currentImageIndex = 0;

// // Function to change the image
// function changeImage() {
//     // Clear existing images
//     collage.innerHTML = '';

//     // Create a new img element
//     const img = document.createElement('img');
//     img.src = images[currentImageIndex];
    
//     // Add flip class to the image
//     img.classList.add('flip');
    
//     // Append the image to the collage
//     collage.appendChild(img);

//     // Move to the next image
//     currentImageIndex = (currentImageIndex + 1) % images.length;
// }

// // Set interval to change the image every 3 seconds
// setInterval(changeImage, 3000); // Adjust timing as needed

// // Initialize the collage with the first image
// changeImage();

// <script>
//     document.addEventListener("DOMContentLoaded", () => {
//         const toggleButton = document.querySelector(".dropdown-toggle");
//         const dropdownContent = document.querySelector(".dropdown-content");

//         toggleButton.addEventListener("click", () => {
//             // Toggle the visibility of the dropdown content
//             if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
//                 dropdownContent.style.display = "block";
//             } else {
//                 dropdownContent.style.display = "none";
//             }
//         });
//     });
// </script>

// toggleButton.addEventListener("click", () => {
//     dropdownContent.classList.toggle("expanded");
// });

// Array of image URLs
// const images = [
//     'src/images/image1.jpg',
//     'src/images/image2.JPG',
//     'src/images/image3.jpg',
//     'src/images/image4.jpg',
//     'src/images/image5.jpg',
//     'src/images/image6.jpeg'
// ];

// // // Select the collage container
// // const collage = document.querySelector('.collage');
// // let currentImageIndex = 0;

// // Function to change the image
// function changeImage() {
//     // Clear existing images
//     //collage.innerHTML = '';

//     // Create a new img element
//     const img = document.createElement('img');
//     img.src = images[currentImageIndex];
    
//     // Add flip class to the image
//     img.classList.add('flip');
    
//     // Append the image to the collage
//     //collage.appendChild(img);

//     // Move to the next image
//     currentImageIndex = (currentImageIndex + 1) % images.length;
// }

// // Set interval to change the image every 3 seconds
// setInterval(changeImage, 3000); // Adjust timing as needed

// // Initialize the collage with the first image
// changeImage();

// Add event listener for the dropdown toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".dropdown-toggle");
    const dropdownContent = document.querySelector(".dropdown-content");

    toggleButton.addEventListener("click", () => {
        // Toggle the visibility of the dropdown content
        if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    });

    // Optional: For smooth transitions, toggle a class instead
    toggleButton.addEventListener("click", () => {
        dropdownContent.classList.toggle("expanded");
    });
});
