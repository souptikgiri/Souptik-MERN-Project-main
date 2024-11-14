document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('post-container');
    const loader = document.getElementById('loader');

    async function fetchPosts() {
        loader.classList.remove('hidden');
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await response.json();

            if (posts.length > 0) {
                posts.forEach(post => {
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card', 'mb-3');
                    cardDiv.style.width = '18rem';

                    cardDiv.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                            <a href="#" class="btn btn-primary">Read more</a>
                        </div>
                    `;

                    container.appendChild(cardDiv);
                });
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            loader.classList.add('hidden');
        }
    }

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            fetchPosts();
        }
    }

    fetchPosts();
    window.addEventListener('scroll', handleScroll);
});
