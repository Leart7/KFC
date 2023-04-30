<?php
namespace Kfc\Libs;
use Exception;
use PDO;
use PDOException;

class Image extends Database{

  protected $produkti_id;
  protected $image_url;

  protected static $db_table = "images";
  protected static $db_tables_fields = array('produkti_id', 'image_url');

  public function getProdukti_id(){
		return $this->produkti_id;
	}

	public function setProdukti_id($produkti_id){
		$this->produkti_id = $produkti_id;
	}

	public function getImage_url(){
		return $this->image_url;
	}

	public function setImage_url($image_url){
		$this->image_url = $image_url;
	}

	public function find_image($produkti_id){
		$this->produkti_id = $produkti_id;
		$sql = "SELECT * FROM images WHERE produkti_id = :produkti_id";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':produkti_id', $this->produkti_id);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();

	}
}
?>