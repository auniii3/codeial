{  
  
    //method to get dom of all the post 
    let getAllPost = function(){
        let allPostDOM = $('.post-list');
        for(let post of allPostDOM){
            deletePost($(' .delete-post-button', post));
        }
    }

    let getAllComment = function(){
        let allPostDOM = $('.comment-list');
        for(let post of allPostDOM){
            deleteComment($(' .delete-comment-button', post));
        }
    }

    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostFrom = $('#new-post-form');
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
                    //we are adding the delete class inside newPost and passing the entire a tag
                    deletePost($(' .delete-post-button', newPost));
                    addComment();
                    displaySuccessFlash(data.message);
                },
                error:function(error){
                    console.log(error.responseText);
                    displayErrorFlash(data.message);
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
           
                <form action="/comments/create" id="new-comment-form" method="POST" class="comment-form">
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
                console.log(data.message);
                $(`#post-${data.data.post_id}`).remove();
                displaySuccessFlash(data.message);
            },
            error:function(error){
                console.log(error.responseText);
                displayErrorFlash(data.message);
            }
        })
    });
    }
    
    //method to add comment for a post using ajax
    let addComment = function(){
        let newCommentForm = $('#new-comment-form');
       
        newCommentForm.submit(function(e){
                e.preventDefault();
                $.ajax({
                    type:'post',
                    url:'/comments/create',
                    data: newCommentForm.serialize(),
                    success:function(data){
                        let newComment = newCommentDOM(data.data.comment);
                        $(`#post-${data.data.comment.post}>div>ul`).prepend(newComment);
                        deleteComment($(' .delete-comment-button', newComment));
                        displaySuccessFlash(data.message);
                    },
                    error:function(error){
                        console.log(error.responseText);
                        displayErrorFlash(data.message);
                    }
                })
            }) 
        }
          

    let newCommentDOM = function(comment){
        return $(`<li>
        <p>
                <small>
                    <a href="/comments/destroy/${comment._id}">X</a>
                </small>
            ${comment.content}
            <br>
            <small>
                 ${comment.user.name}
            </small>
        </p>    
    </li>`)
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#comment-${data.data.comment_id}`).remove();
                displaySuccessFlash(data.message);
            },
            error:function(error){
                displayErrorFlash(data.message);
                console.log(error.responseText);
            }
        })
    });
    }
    
    let displaySuccessFlash = function(message){
        if(message && message.length > 0) {
            new Noty({
                theme:'relax',
                text:message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        }
    }

    let displayErrorFlash = function(message){
         if(message && message.length > 0) {
            new Noty({
                theme:'relax',
                text:message,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show();
        }
    }

    getAllPost();
    getAllComment();
    createPost();
    addComment();
}