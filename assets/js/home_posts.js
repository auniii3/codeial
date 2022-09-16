{
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostFrom = $("#new-post-form");
        newPostFrom.submit(function(e){
            e.preventDefault();
            //ajax send xhr request (XML http request)
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostFrom.serialize(),
                success:function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
        <p> 
            
    
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
          
            ${post.content}
                <br>
                <small>
                    ${post.user.name}
                </small>
                
        </p>
        <div class="post-comments">
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
           
        </div>
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
                
            </ul>
    
        </div>
    
    </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    });
    }
    createPost();
}