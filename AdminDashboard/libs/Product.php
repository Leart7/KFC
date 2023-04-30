<?php

namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class Product extends Database
{
    use UploadPhoto;
    protected static $db_table = "products";
    protected static $db_fields = array("emri_produktit", "pershkrimi", "cmimi", "kategoria_id", "home_category_id", "photo");

    protected $id;
    protected $emri_produktit;
    protected $pershkrimi;
    protected $cmimi;
    protected $kategoria_id;
    protected $home_category_id;
    protected $photo;
    protected $photoImage;


    public function setId($id)
    {
        $this->id = $id;
    }
    public function getId()
    {
        return $this->id;
    }

    public function getEmri_produktit(){
        return $this->emri_produktit;
      }
    
      public function setEmri_produktit($emri_produktit){
        $this->emri_produktit = $emri_produktit;
      }

      public function getPershkrimi(){
        return $this->pershkrimi;
      }
    
      public function setPershkrimi($pershkrimi){
        $this->pershkrimi = $pershkrimi;
      }
    
      public function getCmimi(){
        return $this->cmimi;
      }
    
      public function setCmimi($cmimi){
        $this->cmimi = $cmimi;
      }
    
      public function getKategoria_id(){
        return $this->kategoria_id;
      }
    
      public function setKategoria_id($kategoria_id){
        $this->kategoria_id = $kategoria_id;
      }
    
      public function getHome_category_id(){
        return $this->home_category_id;
      }
    
      public function setHome_category_id($home_category_id){
        $this->home_category_id = $home_category_id;
      }

    public function setPhoto($photo)
    {
        $this->photo = $photo;
    }
    public function getPhoto()
    {
        return $this->photo;
    }
    public function setPhotoImage($photoImage)
    {
        $this->photoImage = $photoImage;
    }
    public function getPhotoImage()
    {
        return $this->photoImage;
    }
    public function create()
    {
        try {
            $this->startupLoad($this->photoImage);
            $this->photo = $this->filename;
            $uploadFile = $this->uploadFile();
            if ($uploadFile) {
                if (parent::create()) {
                    return true;
                }
            } else {
                foreach ($this->errors as $error) {
                    echo $error . "<br>";
                }
            }
        } catch (Exception $e) {
            echo "User " . $e->getMessage();
        }
    }
    public function update()
    {
        try {
            if (isset($this->photoImage)) {
                $this->uploadfile = $this->src . $this->photo;
                unlink($this->uploadfile);
                $this->startupLoad($this->photoImage);
                $this->photo = $this->filename;
                $uploadFile = $this->uploadFile();
                if ($uploadFile) {
                    if (parent::update()) {
                        return true;
                    }
                } else {
                    foreach ($this->errors as $error) {
                        echo $error . "<br>";
                    }
                }
            }else{
                if (parent::update()) {
                    return true;
                }
            }
        } catch (Exception $e) {
            echo "User " . $e->getMessage();
        }
    }
    public function delete()
    {
        try {
            if (parent::delete()) {
                $this->uploadfile = $this->src . $this->photo;
                unlink($this->uploadfile);
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            echo "User " . $e->getMessage();
        }
    }

    public function getNumriProdukteve(){
        $sql = "select count(*) from products";
        $stmt = $this->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
    }

    public function findNumProductsByCategory($id){
        $sql = "SELECT COUNT(*) FROM products WHERE kategoria_id = {$id}";
        $stmt = $this->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
    }
}
