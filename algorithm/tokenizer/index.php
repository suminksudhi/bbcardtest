<?php 
/**
substring detection with complexity n
**/
Class Tokenizer{
	
	protected $stringTemp = ""; //holds occurnece for character under process defaults to fist char of string
	protected $tokenArray = Array(); //holds occurnece for character under process defaults to fist char of string
	private $unwantedToken = Array( //holds the keys to be filtered from token array
		"string"=>Array("This","is","a","I","am"),
		"integer"=>Array(2,1)
	);
	protected $lineArray = Array();
	
	/**
	 * used to addline to the tokenizer lineArray
	 * @param $line the string value passed on from cmdline input
	 * @returns {Tokenizer}
	 */
	public function addline($line=""){
		array_push($this->lineArray,$line);
		return $this->tokenizeString($line);
	}
	
	/**
	 * used to get the repeated keyword strength
	 * @param $firstlineIndex the first string index which has to be compared
	 * @param $secondlineIndex the second string index which has to be compared
	 * @returns $repeatedKeywordArray array of repeated keywords with their strengths
	 */
	public function getRepeatedTokenStrength($firstlineIndex,$secondlineIndex){
		if(count($this->tokenArray)>1){//only if we have multiple values
			$resultArray = array_merge($this->tokenArray[$firstlineIndex],$this->tokenArray[$secondlineIndex]);
			
			$arraylength = count($resultArray);
			$repeatedKeywordArray = array();
			$wordCount = array_count_values($resultArray);
			foreach($wordCount as $val => $c)//get occurence of each values and add strength to it
				if($c > 1) $repeatedKeywordArray[$val] = $c/$arraylength;
			return $repeatedKeywordArray;
		}else{
			return false;
		}
	}
	
	/**
	 * used to get the token array
	 */
	public function getTokenArray(){
		return $this->tokenArray;
	}
	
	/**
	 * used to tokenize and filter a line obtained from cmdline
	 * @param $line the string value passed on from cmdline input
	 * @returns {Tokenizer}
	 */
	private function tokenizeString($line=""){
		if(is_integer($line)){
			$tokenArray  = array_map('intval', str_split($line));
			$filterType = "integer";
		}else{
			$tokenArray = explode(" ",trim($line));
			$filterType = "string";
		}
		
		//now lets filter out the token array
		$filterCount=count($this->unwantedToken[$filterType]);
		for($i=0;$i<$filterCount;$i++){
			$index = array_search($this->unwantedToken[$filterType][$i], $tokenArray);
			//echo $this->unwantedToken[$filterType][$i]." ".$index.PHP_EOL;
			if($index!==false){
				unset($tokenArray[$index]);//remove the value for token array
				$tokenArray = array_values($tokenArray); //reset the keys
			}
		}
		array_push($this->tokenArray,$tokenArray);
		return $this;
	}
}



$lineCount = 1;
$inputType = 1;
echo "Enter inputtype:".PHP_EOL."1)integer".PHP_EOL."2)character".PHP_EOL;
$handle = fopen ("php://stdin","r");
$inputType = (int)fgets($handle);
if($inputType<=0 || $inputType>2){
	echo "Enter valid no!".PHP_EOL;
	exit;
}
	
$test = new Tokenizer();
while(1){
	echo "Enter line {$lineCount}:".PHP_EOL;
	$handle = fopen ("php://stdin","r");
	if($inputType==1){
		$line = (int)fgets($handle);
	}else{
		$line = fgets($handle);
	}
	
	//adds the line to tokenizer and get the token strength
	$tokenStrength = $test->addline($line)->getRepeatedTokenStrength(0,1);
	if($tokenStrength){
		var_dump($tokenStrength);
		exit;
	}
	
	if(trim($line)=='q'){
		echo "ABORTING!\n";
		exit;
	}
	$lineCount++;
}