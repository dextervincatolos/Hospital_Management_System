$(document).ready(function() {
    $("#registerphysician").submit(function(event) {
        alert("New Physician Registered");
    });


    $("#updatephysician").submit(function(event){
        event.preventDefault();

        var _array =$(this).serializeArray();
        var data = {}

        $.map(_array,function(n,i){
            data[n['name']] = n['value']
        })
         console.log(data);

         var request = {
            "url": `http://localhost:3000/api/physician/${data._id}`,
            "method": "PUT",
            "data": data
         }

         $.ajax(request).done(function(response){
            alert("Record Updated successfully!");
            window.location.href = '/physicians';
         })
     })

     if(window.location.pathname=="/physicians"){
        $ondelete = $(".table tbody td a.delete");
        $ondelete.click(function(){
            var id = $(this).attr("data-id")
    
            var request = {
                "url": `http://localhost:3000/api/physician/${id}`,
                "method": "DELETE"
             }
             if(confirm("Are you sure you want to delete this Record?")){
                $.ajax(request).done(function(response){
                    alert("Data Deleted successfully!");
                    window.location.href = '/physicians';
                 }) 
             }
        })
     }


    
});
