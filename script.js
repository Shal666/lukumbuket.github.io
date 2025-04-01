document.addEventListener('DOMContentLoaded', function () {
  // ========== Определение активной страницы ==========
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (currentPath === linkPath ||
        (currentPath === '' && linkPath === 'index.html') ||
        (linkPath === 'index.html' && currentPath.includes('.html') === false)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Вызываем при загрузке
  setActiveNavLink();

  // ========== Мобильное меню ==========
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function () {
      this.classList.toggle('active');
      navbarCollapse.classList.toggle('show');

      // Блокировка скролла при открытом меню
      if (navbarCollapse.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
        document.body.style.overflow = '';

        // Обновляем активную ссылку после клика
        setTimeout(setActiveNavLink, 50);
      });
    });
  }

  // ========== Фильтрация товаров (улучшенная версия) ==========
  const filterButtons = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');

  if (filterButtons.length && products.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Добавляем активный класс текущей кнопке
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        let hasMatches = false;

        // Анимация фильтрации
        products.forEach(product => {
          const category = product.getAttribute('data-category');

          if (filterValue === 'all' || category === filterValue) {
            product.style.opacity = '0';
            product.style.display = 'block';

            setTimeout(() => {
              product.style.opacity = '1';
            }, 50);

            hasMatches = true;
          } else {
            product.style.opacity = '0';

            setTimeout(() => {
              product.style.display = 'none';
            }, 300);
          }
        });

        // Если нет совпадений, показываем сообщение
        const noResults = document.querySelector('.no-results');
        if (!hasMatches && filterValue !== 'all') {
          if (!noResults) {
            const container = document.querySelector('.products-container');
            const message = document.createElement('div');
            message.className = 'no-results text-center py-5';
            message.innerHTML = '<p>Товары в этой категории временно отсутствуют</p>';
            container.appendChild(message);
          }
        } else if (noResults) {
          noResults.remove();
        }
      });
    });

    // Активируем кнопку "Все" по умолчанию
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) allButton.classList.add('active');
  }

  // ========== Сортировка товаров по цене (улучшенная версия) ==========
  const sortAscButton = document.querySelector('.sort-asc');
  const sortDescButton = document.querySelector('.sort-desc');

  if (sortAscButton && sortDescButton && products.length) {
    sortAscButton.addEventListener('click', function () {
      sortProducts('asc');
      updateActiveSortButton(this);
    });

    sortDescButton.addEventListener('click', function () {
      sortProducts('desc');
      updateActiveSortButton(this);
    });

    function updateActiveSortButton(activeButton) {
      [sortAscButton, sortDescButton].forEach(btn => {
        btn.classList.remove('active');
      });
      activeButton.classList.add('active');
    }

    function sortProducts(order) {
      const productsArray = Array.from(products).filter(product =>
        window.getComputedStyle(product).display !== 'none'
      );

      productsArray.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });

      const container = document.querySelector('.products-container') ||
        document.querySelector('.row');

      if (container) {
        // Анимация перестановки элементов
        container.style.opacity = '0';

        setTimeout(() => {
          productsArray.forEach((product, index) => {
            setTimeout(() => {
              container.appendChild(product);
              if (index === productsArray.length - 1) {
                container.style.opacity = '1';
              }
            }, index * 50);
          });
        }, 300);
      }
    }
  }
}); 