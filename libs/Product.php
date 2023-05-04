<?php
namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class Product extends Database{

  protected $id;
  protected $emri_produktit;
  protected $pershkrimi;
  protected $cmimi;
  protected $kategoria_id;
  protected $home_category_id;
	protected $photo;

  protected static $db_table = "products";
  protected static $db_tables_fields = array('emri_produktit', 'pershkrimi', 'cmimi', 'kategoria_id', 'home_category_id', 'photo');

  public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getEmri_produktit(){
		return $this->emri_produktit;
	}

	public function getPhoto(){
		return $this->photo;
	}

	public function setPhoto($photo){
		$this->photo = $photo;
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

	public function find_active_home_tab(){
		$sql = "SELECT * FROM products WHERE home_category_id = 1";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchAll();
	}

	public function find_other_home_tab($katid){
		$sql = "SELECT * FROM products WHERE home_category_id = {$katid}";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchAll();
	}

	public function find_all_tabs($katid){
		$sql = "SELECT * FROM products where kategoria_id = {$katid}";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchAll();
	}
}
?>
