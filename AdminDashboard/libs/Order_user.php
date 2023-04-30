<?php
namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class Order_user extends Database{

  protected $id;
  protected $email;

  protected static $db_table = "order_user";
  protected static $db_tables_fields = array('email');

  public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function nextId(){
		$sql = "SELECT max(id) from order_user";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}


}
?>