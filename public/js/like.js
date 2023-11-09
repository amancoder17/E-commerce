
async function likeButton(productId,btn){
    try {
         await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
          });
          if(btn.classList.contains('bx-heart')){
            btn.classList.remove('bx-heart');
            btn.classList.add('bxs-heart');
          }
          else{
            btn.classList.remove('bxs-heart');
            btn.classList.add('bx-heart');
          }
          
    } catch (e) {
        window.location.replace('/login');
    }
}

window.document.addEventListener('click',(e)=>{
    const btn=e.target;
    if(btn.classList.contains('like-btn'))
    {
        const productId= btn.getAttribute('product-id')
        
        likeButton(productId,btn);
    }
})