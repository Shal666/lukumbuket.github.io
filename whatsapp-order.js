<<<<<<< HEAD
// whatsapp-orders.js
document.addEventListener('DOMContentLoaded', function() {
    const config = {
      whatsappNumber: '77015534338', // Ваш номер без +
      messageTemplate: 'Здравствуйте! Хочу заказать: {product}, цена {price}'
    };
  
    function handleWhatsAppOrder(e) {
      e.preventDefault();
      
      const button = e.currentTarget;
      const card = button.closest('.product-card, .card');
      
      // Получаем данные о товаре
      const product = card.querySelector('.card-title')?.textContent.trim() || 'товар';
      let price = '';
      
      // Форматируем цену
      const priceElement = card.querySelector('.card-price');
      if (priceElement) {
        price = priceElement.textContent
          .replace(/\D+/g, ' ') // Удаляем лишние символы
          .replace(/(\d)\s+(\d)/g, '$1$2') // Убираем пробелы между цифрами
          .trim();
          
        // Добавляем запятую для тысяч (12 000 → 12,000)
        if (price.length > 3) {
          price = price.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
      }
  
      // Формируем сообщение
      const message = config.messageTemplate
        .replace('{product}', product)
        .replace('{price}', price ? price + ' ₸' : '');
      
      // Открываем WhatsApp
      window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  
    // Инициализация
    document.querySelectorAll('.product-card .btn-primary, .card .btn-primary').forEach(button => {
      if (button.closest('.product-card, .card')) {
        button.addEventListener('click', handleWhatsAppOrder);
      }
    });
=======
// whatsapp-orders.js
document.addEventListener('DOMContentLoaded', function() {
    const config = {
      whatsappNumber: '77015534338', // Ваш номер без +
      messageTemplate: 'Здравствуйте! Хочу заказать: {product}, цена {price}'
    };
  
    function handleWhatsAppOrder(e) {
      e.preventDefault();
      
      const button = e.currentTarget;
      const card = button.closest('.product-card, .card');
      
      // Получаем данные о товаре
      const product = card.querySelector('.card-title')?.textContent.trim() || 'товар';
      let price = '';
      
      // Форматируем цену
      const priceElement = card.querySelector('.card-price');
      if (priceElement) {
        price = priceElement.textContent
          .replace(/\D+/g, ' ') // Удаляем лишние символы
          .replace(/(\d)\s+(\d)/g, '$1$2') // Убираем пробелы между цифрами
          .trim();
          
        // Добавляем запятую для тысяч (12 000 → 12,000)
        if (price.length > 3) {
          price = price.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
      }
  
      // Формируем сообщение
      const message = config.messageTemplate
        .replace('{product}', product)
        .replace('{price}', price ? price + ' ₸' : '');
      
      // Открываем WhatsApp
      window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  
    // Инициализация
    document.querySelectorAll('.product-card .btn-primary, .card .btn-primary').forEach(button => {
      if (button.closest('.product-card, .card')) {
        button.addEventListener('click', handleWhatsAppOrder);
      }
    });
>>>>>>> c6f7be9 (Заливаю сайт)
  });