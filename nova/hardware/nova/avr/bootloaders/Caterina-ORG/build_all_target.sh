 #    his program is free software: you can redistribute it and/or modify
 #    it under the terms of the GNU General Public License as published by
 #    the Free Software Foundation, either version 3 of the License, or
 #    (at your option) any later version.
 #
 #    This program is distributed in the hope that it will be useful,
 #    but WITHOUT ANY WARRANTY; without even the implied warranty of
 #    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 #    GNU General Public License for more details.
 #
 #    You should have received a copy of the GNU General Public License
 #    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #
 # 	  build_all_target.sh  Copyright (C) 2015  Dog Hunter AG
 #    This program comes with ABSOLUTELY NO WARRANTY;
 #    This is free software, and you are welcome to redistribute it
 #    under certain conditions;
 #	  
 #	  For other information: Francesco Alessi (francesco@arduino.org)
 #							 Arturo Rinaldi (arturo@doghunter.org)

 #!/bin/bash

board_list=(Caterina-Leonardo 	Caterina-Micro 	Caterina-Esplora 	Caterina-Yun 	Caterina-Robot-Control 	Caterina-Robot-Motor 	Caterina-YunMini    Caterina-LeonardoEthernet)
pid_list=(0x0036 				0x0037 			0x003C 				0x0041			0x0038 					0x0039 					0x0050 				0x0040)

# for object in ${board_list[*]}
for (( i=0; i<=$(( ${#board_list[@]} -1 )); i++ ))
do
	echo ""
	echo "TARGET is : ${board_list[$i]} while PID is ${pid_list[$i]}"
	echo ""
	make all TARGET=${board_list[$i]} PID=${pid_list[$i]}
	make clean TARGET=${board_list[$i]}
done

for (( i=0; i<=$(( ${#board_list[@]} -1 )); i++ ))
do
	if [ -e ${board_list[$i]}.hex ]
	then
		echo "${board_list[$i]}.hex : PASS" 
	else
		echo "${board_list[$i]}.hex : FAIL"
	fi
done
	
echo ""
echo " Done ! ! !"
echo ""