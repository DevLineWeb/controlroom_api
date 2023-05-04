<?php
include_once('../data/conect.php');
session_start();
    $verify = "SELECT * FROM users WHERE user_mail = '{$_SESSION["mail"]}'";
    $result = mysqli_query($conect, $verify);
    $row= mysqli_fetch_array($result);
    $id = $row['id'];
   if(isset($_FILES["ghost--img--input"])) {
      $user_mail = $_SESSION['mail'];
      $target_dir = "../data/users_images/";
      $original_name = basename($_FILES["ghost--img--input"]["name"]);
      $name_ext = $user_mail . "." . pathinfo($original_name, PATHINFO_EXTENSION);
      $target_file = $target_dir . $name_ext;
      $uploadOk = 1;
    //   $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
      
      // Check if file already exists
      if (file_exists($target_file)) {
         $uploadOk = 1;
      }
      
      // Check file size
      if ($_FILES["ghost--img--input"]["size"] > 500000) {
         echo "
        <div class='request--feedback--info'>
            <div class='modal--legend'>
                <legend>Aviso!</legend>
            </div>
            <div class='box--line'>
                <div class='box--col'>
                    <P>Imagem muito grande!</P>
                </div>
            </div>
            <div class='modal--footer'>
                <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
            </div>
        </div>";
         $uploadOk = 0;
      }
      
      // Allow certain file formats
    //   if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    //   && $imageFileType != "gif" ) {
    //      echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    //      $uploadOk = 0;
    //   }
      
      // Check if $uploadOk is set to 0 by an error
      if ($uploadOk == 0) {
        echo "
         <div class='request--feedback--info'>
             <div class='modal--legend'>
                 <legend>Aviso!</legend>
             </div>
             <div class='box--line'>
                 <div class='box--col'>
                     <P>Sorry, your file was not uploaded.</P>
                 </div>
             </div>
             <div class='modal--footer'>
                 <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
             </div>
         </div>";
      // if everything is ok, try to upload file
      } else {
         if (move_uploaded_file($_FILES["ghost--img--input"]["tmp_name"], $target_file)) {
            $updateUserImg = mysqli_query($conect,"UPDATE users SET
            user_img = '$name_ext'
            WHERE id = $id");

            echo "
            <div class='request--feedback--info'>
                <div class='modal--legend'>
                    <legend>Aviso!</legend>
                </div>
                <div class='box--line'>
                    <div class='box--col'>
                        <P>Imagem Atualizada!</P>
                    </div>
                </div>
                <div class='modal--footer'>
                    <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
                </div>
            </div>";
         } else {
            echo "
            <div class='request--feedback--info'>
                <div class='modal--legend'>
                    <legend>Aviso!</legend>
                </div>
                <div class='box--line'>
                    <div class='box--col'>
                        <P>Error on Upload!</P>
                    </div>
                </div>
                <div class='modal--footer'>
                    <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
                </div>
            </div>";
            exit;
         }
      }
   }


?>