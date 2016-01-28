<?php 
/**
substring detection with complexity n
**/
Class Substring{
	
	protected $stringTemp = ""; //holds occurnece for character under process defaults to fist char of string
	protected $firstOccurence = 0; //holds occurnece for character under process defaults to fist char of string
	protected $nextOccurence  = 0; //holds occurnece for character under process defaults to fist char of string
	protected $hasSubstring = true;
	
	protected $numberOfOccurence=0;
	
	public function stringOfForm(){
		return ($this->hasSubstring)?($this->numberOfOccurence.'s'):false;
	}
	
	private function getMatch(){
		$firstOccurence = $this->firstOccurence;
		$nextOccurence = $this->nextOccurence;
		$stringTemp = $this->stringTemp;
		$numberOfOccurence = $this->numberOfOccurence;
		$stringLength = strlen($stringTemp);
		$charIndex=0;	
		$callNextMatch = false;
		//echo "yo".$firstOccurence." ".$nextOccurence." ".$numberOfOccurence." ".$stringLength.PHP_EOL;
		for($i=0;$i<$numberOfOccurence;$i++){
				$charIndex = (($i*($nextOccurence))+$firstOccurence);
				$charIndex = ($charIndex<=0)?0:$charIndex;
			
				if($charIndex==$stringLength){
					$this->hasSubstring = false;
					break;
				}
				//echo $firstOccurence."::".$stringTemp[$firstOccurence]." ".$i." ".$charIndex."::".$stringTemp[$charIndex].PHP_EOL;
				if($stringTemp[$firstOccurence]!=$stringTemp[$charIndex]){//break on mismatch of character
					$this->hasSubstring = false;
					break;
				}
				if(($i==($numberOfOccurence-1))){ //once we have matched all the first chars of n number of occurence
					//echo "no".$firstOccurence." ".$nextOccurence." ".$numberOfOccurence." ".$i.PHP_EOL;
					if($firstOccurence<($nextOccurence-1)){
						//echo "no".PHP_EOL;
						$this->firstOccurence = $firstOccurence+1;
						$callNextMatch = true;
					}else{
						$callNextMatch = false;
						$this->hasSubstring = true;
						break;
					}
				}
			}
			
			if($callNextMatch){
				$this->getMatch();
			}
		return $this->hasSubstring ;
	}
		
	public function getString($stringTemp=""){
		$stringLength = strlen($stringTemp);
		$this->stringTemp = $stringTemp;
		$firstOccurence = $this->firstOccurence;
		$nextOccurence = $this->nextOccurence;
		$numberOfOccurence = $this->numberOfOccurence;
		
		if($stringTemp){
			for($i=0;$i<$stringLength;$i++){
				if($stringTemp[$i]==$stringTemp[$firstOccurence] && $firstOccurence!=$i){
					//echo $stringTemp[$i]." ".$i.PHP_EOL;
					$nextOccurence = $i;
					$numberOfOccurence = ceil($stringLength/($nextOccurence-$firstOccurence));
					break;
				}
			}
			
			//echo $firstOccurence." ".$nextOccurence." ".$numberOfOccurence.PHP_EOL;
			$this->nextOccurence = $nextOccurence; //update occurence
			$this->numberOfOccurence = $numberOfOccurence; //update occurence
			$this->getMatch();
		}
		return $this->hasSubstring;
	}
}

if(count($argv)>1){
	$argument1 = $argv[1];
	$test =  new Substring();
	var_dump($test->getString($argument1));
	var_dump($test->stringOfForm());
}else{
	echo "Usage: php index.php {string_to_test}";
}