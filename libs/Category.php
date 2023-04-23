<?php
namespace Kfc\Libs;

class Category extends Database{
  protected $id;
  protected $emri_kategorise;

  protected static $db_table = "categories";
  protected static $db_tables_fields = array('id', 'emri_kategorise');

  public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getEmri_kategorise(){
		return $this->emri_kategorise;
	}

	public function setEmri_kategorise($emri_kategorise){
		$this->emri_kategorise = $emri_kategorise;
	}
}
?>