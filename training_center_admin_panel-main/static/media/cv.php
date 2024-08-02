
<?php
include ('header.php');
include ('Admin_model.php');
session_start();
if(!isset($_SESSION['admin'])){
   header('location:index.php');
    die;
}
$model=new Admin_model;
$cv_students=$model->get_cv_students();
?>

<div class="container">
  <h2>CV students</h2>
  
  <table class="table">
    <thead>
      <tr>
      	<th></th>
      	<th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phon</th>
        <th>Address</th>
        <th>Show CV</th>
        <th>Delete</th>
      </tr>
    </thead>

    <tbody>
    	<?php
    	$ind=0;
    	$classes=['success',"danger","info","warning","active"];
      foreach($cv_students as $stud){
            if(!empty($stud['image']))
                $src='../cv/cv_images/'.$stud['image'];
                else
             $src='../cv/cv_images/camera.png';
          
            $id=$stud['id'];
            $name=$stud['name'];
            $email=$stud['email'];
            $phone=$stud['phon'];
            $address=$stud['address'];
            $published=$stud['published'];
            if($published)
            	$elem="<a href='http://colibrilab.am/cv/my_cv.php?id=$id'>show</a>";
            else
            	$elem="Not published";

            $class=$classes[$ind];
            $ind++;
            $ind=$ind%5;

          echo"  <tr class='$class'>
          <td><img src=$src width=75></td>
        <td>$id</td>  
        <td>$name</td>
        <td>$email</td>
        <td>$phone</td>
        
        <td>$address</td>
       
        <td>$elem</td>
        <td><button class='btn btn-danger' id=$id>Delete</button</td>
      </tr>";
       }

?>
  </tbody>
  </table>
</div>
<script>
   $(document).ready(function(){
    $('.btn').click(function(){

       let id=$(this).attr('id');
   
       $.ajax({
           url:'delete.php',
           type:'post',
           data:{
             id:id,type:'cv'
           },
           success:function(d){
            //alert(d)
              //location.reload();
            }
        })
   })
 })   
</script>
<?php
include ('footer.php');


?>