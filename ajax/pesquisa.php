<?php
	$json_file = file_get_contents("http://dicionario-aberto.net/search-json/".$_GET["palavra"]);

	$json_str = json_decode($json_file, true);
	if($json_str != NULL){
		$retorno["orth"] = $json_str["entry"]["form"]["orth"];
		$retorno["def"] = "";
		foreach($json_str["entry"]["sense"] as $inf){
			$def = explode("_",$inf["def"]);
			$cont = count($def);
			if($cont > 1){
				$i = 1;
				while($i <= $cont){
					$def2 = '';
					if(($i % 2) == 0){
						$def2 .= "<a href=\"#\" onClick=\"pesquisa('".$def[$i - 1]."')\">".$def[$i - 1]."</a>";
					}else{
						$def2 .= $def[$i - 1];
					}
					$i++;
					$retorno["def"] .= " - ".$def2;
				}
			}else{
				$retorno["def"] .= " - ".$inf["def"]."<br>";
			}
		}
		$retorno["tipo"] = 1;
	}else{
		$json_file2 = file_get_contents("http://dicionario-aberto.net/search-json?like=".$_GET["palavra"]);
		$json_str2 = json_decode($json_file2, true);
		if(count($json_str2["list"]) > 0){
			$retorno = $json_str2["list"];
			$retorno["numero"] = count($json_str2["list"])-1;
			$retorno["tipo"] = 2;
		}else{
			$retorno["tipo"] = 0;
			$retorno["erro"] = "Palavra não encontrada.";
		}
	}
	$ret = json_encode($retorno);
	echo $ret;

?>