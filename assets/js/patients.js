$(document).ready(function() {
    $("#registerpatient").submit(function(event) {
        alert("New Patient admitted");
    });


    $("#updatepatient").submit(function(event){
        event.preventDefault();

        var _array =$(this).serializeArray();
        var data = {}

        $.map(_array,function(n,i){
            data[n['name']] = n['value']
        })
         console.log(data);

         var request = {
            "url": `http://localhost:3000/api/patients/${data._id}`,
            "method": "PUT",
            "data": data
         }

         $.ajax(request).done(function(response){
            alert("Record Updated successfully!");
            window.location.href = '/patients';
         })
     })

     if(window.location.pathname=="/patients"){
        $ondelete = $(".table tbody td a.delete");
        $ondelete.click(function(){
            var id = $(this).attr("data-id")
    
            var request = {
                "url": `http://localhost:3000/api/patients/${id}`,
                "method": "DELETE"
             }
             if(confirm("Are you sure you want to delete this Record?")){
                $.ajax(request).done(function(response){
                    alert("Data Deleted successfully!");
                    window.location.href = '/patients';
                 }) 
             }
        })
     }


    
});
