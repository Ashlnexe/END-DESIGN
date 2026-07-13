document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');

      // Get filter category
      const filterValue = btn.getAttribute('data-filter');

      // Filter gallery items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          item.classList.remove('hidden');
          // Add a tiny animation delay for smoother reveal if needed
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
          item.style.animation = 'none';
        }
      });
    });
  });
});
