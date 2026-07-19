export function initExperts() {
  const showMoreBtn = document.getElementById('experts-show-more');
  const expertsList = document.getElementById('experts-list');
  
  if (!showMoreBtn || !expertsList) return;

  showMoreBtn.addEventListener('click', () => {
    const isExpanded = expertsList.dataset.expanded === 'true';
    const hiddenItems = expertsList.querySelectorAll('.experts__bottom-item:nth-child(n+4)');
    
    if (isExpanded) {
      // Hide items
      hiddenItems.forEach(item => {
        item.style.display = 'none';
        item.style.animation = '';
      });
      expertsList.dataset.expanded = 'false';
      showMoreBtn.innerHTML = '<img class="experts__bottom-button-img" src="images/icons/experts__bottom-button.svg" alt="">Показать больше';
    } else {
      // Show items
      hiddenItems.forEach(item => {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease forwards';
      });
      expertsList.dataset.expanded = 'true';
      showMoreBtn.innerHTML = '<img class="experts__bottom-button-img" src="images/icons/experts__bottom-button.svg" alt="" style="transform: rotate(180deg)">Скрыть';
      
      if (!document.getElementById('experts-anim')) {
        const style = document.createElement('style');
        style.id = 'experts-anim';
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  });
}
