jQuery(document).ready(function($){
    $("#FeedbackTable_info").text("");
    $('#deleteRow').attr("disabled", true);

    var NoDuplicates = false;
    var checkboxes = "";

    var checkBoxes = $('tbody .checkBox');
    checkBoxes.change(function () {
        $('#deleteRow').prop('disabled', checkBoxes.filter(':checked').length < 1);
        checkboxes = document.getElementsByName("checkBox");
    });
    checkBoxes.change();
    
     $("#deleteRow").click(function(){ 
         NoDuplicates = false;
          for (var i=0; i<checkboxes.length; i++) {
             if (checkboxes[i].checked) {
                 let id = checkboxes[i].value
                   $.ajax({
                       url: "delete-feedback",                 // app.post("/delete")
                       method: "POST",
                       data: {
                          id : id
                       },
                       success: function(result){
                           if (result.ok == 1 && NoDuplicates == false){
                               NoDuplicates = true;
                              alertify.set('notifier','position', 'bottom-left'); 
                              alertify.success('Deleted Successfully');
                               // remove the actual row
                           }
                           else if (result.ok == 1 && NoDuplicates == true){}
                           else
                               alert("something went wrong")
                          
                           $("input[data-id='"+id+"']").trigger('click');   // unclick or uncheck the selected
                           $("tr[data-id='"+id+"']").remove()
                       }
                   })
             }
          }
        })
    
})

                