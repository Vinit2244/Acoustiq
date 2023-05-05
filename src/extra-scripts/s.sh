#!/bin/bash
`ls > temp.txt`

count=0

func() {
    ((count++))
    echo $count
}

while read -r line
do
    for file in $line
    do
        count=0
        `sed -i -E 's|<th><img src="./media/logos/clock.png" alt="" style="height: 45px;"></th>|<th><img src="./media/logos/clock.png" alt="" style="height: 45px;"></th>\n\t\t\t\t<th style="text-align: center;">Add to Playlist</th>|' $file`
        `sed -i -E 's|<td class="social">|<td style="text-align: center;">\n\t\t\t\t\t<form>\n\t\t\t\t\t\t<input type="radio" name="playlist-radio-button" id="radio-button-number" onclick="showPopUp(this)>\n\t\t\t\t\t\t<label for="radio-button-number"></label>\n\t\t\t\t\t</form>\n\t\t\t\t</td> \n\t\t\t\t<td class="social">|' $file`
        `sed -i -E 's|<script src="../scripts/hover.js"></script>|<script src="../scripts/hover.js"></script>\n<script src="../scripts/pop-up.js"></script>|' $file`
    done
done < ./temp.txt

`find . -type f -name "*-E" > temp.txt`

while read -r line
do
    for file in $line
    do  
        `rm $file`
    done
done < ./temp.txt

`rm temp.txt`

`ls > list_of_all_files.txt`