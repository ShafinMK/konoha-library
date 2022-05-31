
// element hide and show function 
let hideShow = (id, value) => {
    document.getElementById(id).style.display = value;
}
// hide the books section 
// hideShow('books-display', 'none');

// click on search button 
document.getElementById('search-books').addEventListener('click', function () {

    let bookName = document.getElementById('book-name').value;
    console.log(bookName);
    hideShow('loading', 'block');
    hideShow('result-found', 'none');
    hideShow('books-display', 'none');
    hideShow('no-data-found', 'none');
    
    bookName = bookName.split(' ').join('%20');
    console.log(bookName);
    let url = `https://openlibrary.org/search.json?q=${bookName}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let books = data.docs;
            // console.log(data.docs);
            hideShow('loading', 'none');
            hideShow('books-display', 'block');
            document.getElementById('book-container').innerText ='';
            //result count
            hideShow('result-found', 'block');
            let resultCount = 0;
            
            
            books.forEach(book => {
                // console.log(book);
                let div = document.createElement('div');
                let bookName = `${book?.title} ${typeof(book?.subtitle) != 'undefined'? ':'+book?.subtitle: ""}`;
                let coverImage = book?.cover_i;
                if(typeof(coverImage) == 'undefined'){
                    coverImage = `https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=2000`;
                }
                else{
                    coverImage = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`;
                }

                
                if(typeof(book?.subject_key) != 'undefined'){
                    // if(book?.subject_key[0] == 'accessible_book'){
                        div.innerHTML = `
                        
                        <div class="card h-100 border-0 shadow">
                        
                        
                        <img src="${coverImage}" class="card-img-top p-4" alt="Book Cover"></img>

                        <div class="card-body">
                            <h5 class="card-title text-center p-4"> ${bookName}</h5>
                            <p class="text-center px-4"><small> ${typeof(book?.author_name) ==='undefined'? 'Author not Found' : book.author_name}</small></p>
                            <p class="text-center">First Published on <span class="fst-italic">${book?.first_publish_year}</span></p>
                        </div>
                        <div class="p-3 d-flex justify-content-between">
                            <button type="button" class="btn  dark-btn px-3"><i class="fa-solid fa-eye me-2"></i>Preview</button>
                            <button type="button" class="btn light-btn px-3"><i class="fa-solid fa-book me-2"></i>Borrow</button>
                        </div>
                        
                        </div>
                        
                        
                        `;
    
    
                    div.classList.add('col')
                    
                    document.getElementById('book-container').appendChild(div);
                    resultCount++;
                    // }
                }
                
                
                
                
            });
            document.getElementById('result-count').innerHTML = resultCount;
            document.getElementById('searched-item').innerHTML = bookName;
            if(resultCount === 0){
                hideShow('books-display', 'none');
                hideShow('no-data-found', 'block');
            }



        })


})

