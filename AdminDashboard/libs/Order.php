<?php
namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class Order extends Database{
  protected $id;
  protected $email;
  protected $produkti_id;
  protected $sasia;
  protected $totali;
  protected $special_instruction;
	protected $data;
	protected $created_at;
	protected $adresa;
	protected $adress_notes;

  protected static $db_table = "orders";
  protected static $db_tables_fields = array('email', 'produkti_id', 'sasia', 'totali', 'special_instruction', 'data', 'created_at', 'adresa', 'adress_notes');

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

	public function getProdukti_id(){
		return $this->produkti_id;
	}

	public function setProdukti_id($produkti_id){
		$this->produkti_id = $produkti_id;
	}

	public function getSasia(){
		return $this->sasia;
	}

	public function setSasia($sasia){
		$this->sasia = $sasia;
	}

	public function getTotali(){
		return $this->totali;
	}

	public function setTotali($totali){
		$this->totali = $totali;
	}

	public function getSpecial_instruction(){
		return $this->special_instruction;
	}

	public function setSpecial_instruction($special_instruction){
		$this->special_instruction = $special_instruction;
	}

	public function getData(){
		return $this->data;
	}

	public function setData($data){
		$this->data = $data;
	}

	public function getCreated_at(){
		return $this->created_at;
	}

	public function setCreated_at($created_at){
		$this->created_at = $created_at;
	}

	public function getAdresa(){
		return $this->adresa;
	}

	public function setAdresa($adresa){
		$this->adresa = $adresa;
	}

	public function getAdress_notes(){
		return $this->adress_notes;
	}

	public function setAdress_notes($adress_notes){
		$this->adress_notes = $adress_notes;
	}

	public function lastOrder($email){
    $this->email = $email;
    $sql = "SELECT data from orders where email = :email order by data desc limit 1";
    $stmt = $this->prepare($sql);
    $stmt->bindParam(':email', $this->email);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
  }

	public function getDistinctData($id){
		$this->id = $id;
		$sql = "SELECT DISTINCT data FROM orders WHERE id = :id";
		$stmt = $this->prepare($sql);
		$stmt->bindParam(':id', $this->id);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}

  public function getNumriPorosive(){
		$sql = "SELECT count(DISTINCT id) from orders";
		$stmt = $this->prepare($sql);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
		return $stmt->fetchColumn();
	}

	public function numberOfCostumers()
    {
        $sql = "SELECT count(distinct email) FROM orders";
        $stmt = $this->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
        return $stmt->fetchColumn();
    }

		public function income(){
			$sql = "SELECT SUM(totali * sasia) as total_income FROM orders;";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchColumn();
		}

		public function trendingProducts(){
			$sql = "SELECT produkti_id, SUM(sasia)
			FROM orders
			GROUP BY produkti_id
			ORDER BY SUM(sasia) DESC
			LIMIT 5;
			";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchAll();
		}

		public function quantityPerProduct($id){
			$sql = "select SUM(sasia)
			FROM orders
			where produkti_id = {$id}
			order by produkti_id";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchColumn();
		}

		public function totalSpentByCustomer($email){
			$this->email = $email;
			$sql = "SELECT SUM(totali * sasia) FROM orders where email = :email";
			$stmt = $this->prepare($sql);
			$stmt->bindParam(':email', $this->email);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchColumn();
		}

		public function recentOrders(){
			$sql = "select DISTINCT id
			FROM orders
			order by id desc
			limit 5";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchAll();
		}

		public function getProducts($id){
			$this->id = $id;
			$sql = "SELECT * FROM orders WHERE id = :id";
			$stmt = $this->prepare($sql);
			$stmt->bindParam(':id', $this->id);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchAll();
		}

		public function topProduct($id){
			$sql = "select max(produkti_id) from orders where id = {$id}";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS,__NAMESPACE__ ."\\{$this->getClassName()}");
			return $stmt->fetchColumn();
		}

		public function userOrder($id){
			$sql = "select email from orders where id = {$id}";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS,__NAMESPACE__ ."\\{$this->getClassName()}");
			return $stmt->fetchColumn();
		}

		public function sasiaProduct($id){
			$sql = "select sasia
			from orders
			where id = {$id}
			order by produkti_id desc
			limit 1";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS,__NAMESPACE__ ."\\{$this->getClassName()}");
			return $stmt->fetchColumn();
		}

		public function getCustomers(){
			$sql = "SELECT * FROM users WHERE roli <> 1";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchAll();
		}

		public function getOrders(){
			$sql = "SELECT DISTINCT id from orders order by id desc";
			$stmt = $this->prepare($sql);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchAll();
		}

		public function getDistinctAddress($id){
			$this->id = $id;
			$sql = "SELECT DISTINCT adresa FROM orders WHERE id = :id";
			$stmt = $this->prepare($sql);
			$stmt->bindParam(':id', $this->id);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchColumn();
		}
	
		public function getDistinctAddressNotes($id){
			$this->id = $id;
			$sql = "SELECT DISTINCT adress_notes FROM orders WHERE id = :id";
			$stmt = $this->prepare($sql);
			$stmt->bindParam(':id', $this->id);
			$stmt->execute();
			$stmt->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\" .$this->getClassName());
			return $stmt->fetchColumn();
		}


}
?>