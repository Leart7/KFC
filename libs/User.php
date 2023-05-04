<?php
namespace Kfc\Libs;

use Exception;
use PDO;
use PDOException;

class User extends Database{
  protected $id;
  protected $emri;
  protected $mbiemri;
  protected $password;
  protected $telefoni;
  protected $roli;

  protected static $db_table = "users";
  protected static $db_tables_fields = array('id', 'emri', 'mbiemri', 'password', 'telefoni', 'roli');

  public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getEmri(){
		return $this->emri;
	}

	public function setEmri($emri){
		$this->emri = $emri;
	}

	public function getMbiemri(){
		return $this->mbiemri;
	}

	public function setMbiemri($mbiemri){
		$this->mbiemri = $mbiemri;
	}

	public function getPassword(){
		return $this->password;
	}

	public function setPassword($password){
		$this->password = $password;
	}

	public function getTelefoni(){
		return $this->telefoni;
	}

	public function setTelefoni($telefoni){
		$this->telefoni = $telefoni;
	}

	public function getRoli(){
		return $this->roli;
	}

	public function setRoli($roli){
		$this->roli = $roli;
	}
	
  public function verifyUser($email, $password)
    {
        $sql = "SELECT * FROM users";
        $sql .= " WHERE id=:email AND password=:password";
        $result = $this->prepare($sql);
        $result->bindParam(':email', $email);
        $result->bindParam(':password', $password);
        $result->execute();
        $result->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\{$this->getClassName()}");
        return $result->fetch();
    }

		public function verifyNewUser($email)
    {
        $sql = "SELECT * FROM users";
        $sql .= " WHERE id=:email";
        $result = $this->prepare($sql);
        $result->bindParam(':email', $email);
        $result->execute();
        $result->setFetchMode(PDO::FETCH_CLASS, __NAMESPACE__ . "\\{$this->getClassName()}");
        return $result->fetch();
    }

}


?>
