package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
	"time"
)

//go:embed inputs/exemple.in
var exemple string
//go:embed inputs/puzzle.in
var puzzle string

func Part1(input string) int {
	lines :=strings.Split(input, "\n")
	for i:=0; i<len(lines); i++{
		for j:=i+1; j<len(lines); j++{
			first,_:=strconv.Atoi(lines[i])
			second,_:=strconv.Atoi(lines[j])
			if first+second == 2020{
				return first*second
			}
		}
	}
	return 0
}

func Part2(input string) int {
	lines :=strings.Split(input, "\n")
	for i:=0; i<len(lines); i++{
		for j:=i+1; j<len(lines); j++{
			for k:=j+1; k<len(lines); k++{
				first,_:=strconv.Atoi(lines[i])
				second,_:=strconv.Atoi(lines[j])
				third,_:=strconv.Atoi(lines[k])
				if first+second+third == 2020{
					return first*second*third
				}
			}
		}
	}
	return 0
}

func main (){
	fmt.Println("\n--- Day 01: Report Repair ---")

	start:=time.Now()
	fmt.Printf("PART 1 'exemple' : %d (executed in %s)\n", Part1(exemple), time.Since(start))
	start=time.Now()
	fmt.Printf("PART 1 'puzzle' : %d (executed in %s)\n", Part1(puzzle), time.Since(start))

	start=time.Now()
	fmt.Printf("PART 2 'exemple' : %d (executed in %s)\n", Part2(exemple), time.Since(start))
	start=time.Now()
	fmt.Printf("PART 2 'puzzle' : %d (executed in %s)\n\n", Part2(puzzle), time.Since(start))
}
