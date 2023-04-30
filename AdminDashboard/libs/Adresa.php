<?php
namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class Adresa extends Database{

  protected $id;
  protected $adresa;
  protected $notes;
	protected $email;
	protected $updated_at;

  protected static $db_table = "adresses";
  protected static $db_tables_fields = array('adresa', 'notes', 'email', 'updated_at');


  public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getAdresa(){
		return $this->adresa;
	}

	public function setAdresa($adresa){
		$this->adresa = $adresa;
	}

  public function getNotes(){
		return $this->notes;
	}

	public function setNotes($notes){
		$this->notes = $notes;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function getUpdated_at(){
		return $this->updated_at;
	}

	public function setUpdated_at($updated_at){
		$this->updated_at = $updated_at;
	}

	public function noAddresses($email){
		$this->email = $email;
		$sql = "SELECT * FROM adresses WHERE email = :email order by updated_at desc limit 1";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();
	}

	public function oneAddress($email){
		$this->email = $email;
		$sql = "SELECT adresa FROM adresses WHERE email = :email order by updated_at desc limit 1";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}
}
?>