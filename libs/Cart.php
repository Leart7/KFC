<?php
namespace Kfc\Libs;
use Exception;
use PDO;
use PDOException;

class Cart extends Database{
  protected $produkti_id;
  protected $email;
  protected $sasia;
  protected $special_instruction;

  protected static $db_table = "cart";
  protected static $db_tables_fields = array('produkti_id', 'sasia');

  public function getProdukti_id(){
		return $this->produkti_id;
	}

	public function setProdukti_id($produkti_id){
		$this->produkti_id = $produkti_id;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function getSasia(){
		return $this->sasia;
	}

	public function setSasia($sasia){
		$this->sasia = $sasia;
	}

	public function getSpecial_instruction(){
		return $this->special_instruction;
	}

	public function setSpecial_instruction($special_instruction){
		$this->special_instruction = $special_instruction;
	}

	public function find_cart($email){
		$this->email = $email;
		$sql = "SELECT * FROM cart WHERE email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchAll();
	}

	// public function getSasiaCart(){
	// 	$sql = "SELECT sum(sasia) from cart";
	// 	$stmt = $this->prepare($sql); 
	// 	$stmt->execute();
	// 	$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
	// 	return $stmt->fetch();
	// }

	public function getSasiaProduktit($produkti_id, $email){
		$this->produkti_id = $produkti_id;
		$this->email = $email;
		$sql = "SELECT sum(c.sasia) FROM cart c inner join products p on c.produkti_id = p.id WHERE p.id = :produkti_id AND c.email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':produkti_id', $this->produkti_id);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}

	public function getSasiaTotale($email){
		$this->email = $email;
		$sql = "SELECT sum(sasia) from cart WHERE email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}

	public function insertCart($produkti_id, $email, $sasia){
		$sql = "INSERT IGNORE INTO cart (produkti_id, email, sasia) VALUES ({$produkti_id}, '{$email}', {$sasia})";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();
	}

	public function updateCart($produkti_id, $sasia, $email){
		$this->email = $email;
		$sql = "UPDATE cart SET sasia = {$sasia} WHERE produkti_id = {$produkti_id} AND email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();
	}

	public function deleteCart($produkti_id, $email){
		$this->email = $email;
		$sql = "DELETE FROM cart WHERE produkti_id = {$produkti_id} AND email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();
	}

	public function deleteUsersCart($email){
		$this->email = $email;
		$sql = "DELETE FROM cart WHERE email = :email";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':email', $this->email);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetch();
	}
}
?>
