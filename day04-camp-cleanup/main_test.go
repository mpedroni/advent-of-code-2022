package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParsingFile(t *testing.T) {
	elves := ParseInputFile("input_test.txt")

	expect := []ElfPair{{"2-4", "6-8"}, {"2-3", "4-5"}, {"5-7", "7-9"}, {"2-8", "3-7"}, {"6-6", "4-6"}, {"2-6", "4-8"}}

	require.EqualValues(t, expect, elves)
}

func TestGetElfPairSectionsToClear(t *testing.T) {
	pair := ElfPair{"2-4", "6-8"}
	expect := []Section{{2, 4}, {6, 8}}

	require.EqualValues(t, expect, GetElfPairSectionsToClear(pair))
}

func TestSectionsOverlapBetweenElfPairs(t *testing.T) {
	notOverlappedSections := []Section{{2, 4}, {6, 8}}
	overlappedSections := []Section{{2, 8}, {3, 7}}

	require.False(t, IsElfSectionsOverlapped(notOverlappedSections[0], notOverlappedSections[1]))
	require.True(t, IsElfSectionsOverlapped(overlappedSections[0], overlappedSections[1]))
}
