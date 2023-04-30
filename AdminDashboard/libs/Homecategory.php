<?php
namespace Kfc\Libs;
use Exception;
use PDO;
use PDOException;
class Homecategory extends Database{
  protected $id;
  protected $home_kategoria;

  protected static $db_table = "homecategories";
  protected static $db_tables_fields = array('id', 'home_kategoria');

	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getHome_kategoria(){
		return $this->home_kategoria;
	}

	public function setHome_kategoria($home_kategoria){
		$this->home_kategoria = $home_kategoria;
	}

	public function find_other_categories($id){
		$sql = "SELECT * FROM homecategories WHERE id <> {$id}";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchAll();
	}

}
?>