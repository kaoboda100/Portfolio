const slides = document.querySelectorAll('.profile-image-slider .slide');
let currentIndex = 0;

function showNextSlide() {
    // Ẩn ảnh hiện tại
    slides[currentIndex].classList.remove('active');
    
    // Tính chỉ số ảnh tiếp theo
    currentIndex = (currentIndex + 1) % slides.length;
    
    // Hiển thị ảnh tiếp theo
    slides[currentIndex].classList.add('active');
}

// Chuyển ảnh mỗi 2 giây
setInterval(showNextSlide, 2000);

// Hiển thị ảnh đầu tiên khi tải trang
slides[currentIndex].classList.add('active');
// Hàm hiển thị video overlay
function playVideo(videoFrame) {
    const overlay = document.getElementById('videoOverlay');
    const overlayVideo = document.getElementById('overlayVideo');
    const videoSource = document.getElementById('videoSource');

    // Lấy video src từ video thumbnail
    const videoSrc = videoFrame.querySelector('video').getAttribute('src');
    
    // Cập nhật nguồn video và phát video
    videoSource.src = videoSrc;
    overlayVideo.load(); // Nạp video mới
    overlayVideo.play(); // Phát video

    // Hiện overlay
    overlay.style.display = 'flex';
}

// Đóng overlay khi click vào nút đóng hoặc bên ngoài video
document.getElementById('closeOverlay').addEventListener('click', closeOverlay);

// Đóng overlay khi click bên ngoài video
document.getElementById('videoOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeOverlay();
    }
});

// Hàm đóng overlay
function closeOverlay() {
    const overlay = document.getElementById('videoOverlay');
    const overlayVideo = document.getElementById('overlayVideo');
    
    overlayVideo.pause(); // Dừng video khi đóng
    overlayVideo.currentTime = 0; // Đặt lại video về đầu
    overlay.style.display = 'none'; // Ẩn overlay
}

// Thêm sự kiện click cho tất cả video frames
document.querySelectorAll('.video-frame').forEach(videoFrame => {
    videoFrame.addEventListener('click', function() {
        playVideo(videoFrame);
    });
});
