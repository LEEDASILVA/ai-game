package main

import (
	"image"
	"log"
	"math/rand"
	"os"
	"strconv"

	"github.com/fogleman/gg"
)

type Point struct {
	X, Y float64
}

func random(min, max float64) float64 {
	return min + rand.Float64()*(max-min)
}

func drawCircles(dc *gg.Context) {
	dc.DrawCircle(random(64/3, 64-(64/3)), random(64/3, 64-(64/3)), random(10.0, 20.0))
	dc.SetRGBA(0, 0, 0, 1)
	dc.SetLineWidth(2)
	dc.Stroke()
}

func drawRect(dc *gg.Context, point Point, size float64) {
	dc.DrawRectangle(point.X, point.Y, size, size)
	dc.SetRGBA(0, 0, 0, 1)
	dc.SetLineWidth(2)
	dc.Stroke()
}

func drawTriangle(dc *gg.Context, point Point, r, rotation float64) {
	dc.DrawRegularPolygon(3, point.X, point.Y, r, rotation)
	dc.SetRGBA(0, 0, 0, 1)
	dc.SetLineWidth(2)
	dc.Stroke()
}

func main() {
	err := os.Mkdir("data", 0755)
	if err != nil {
		log.Panic(err)
	}

	for i := 1; i <= 200; i++ {
		dc := gg.NewContextForRGBA(image.NewRGBA(image.Rect(0, 0, 64, 64)))
		dc.SetRGB(1, 1, 1)
		dc.Clear()

		drawCircles(dc)
		dc.SavePNG("./data/circle" + strconv.Itoa(i) + ".png")

		dc = gg.NewContextForRGBA(image.NewRGBA(image.Rect(0, 0, 64, 64)))
		dc.SetRGB(1, 1, 1)
		dc.Clear()

		drawRect(dc, Point{random(5, 30), random(5, 30)}, random(10.0, 30.0))
		dc.SavePNG("./data/square" + strconv.Itoa(i) + ".png")

		dc = gg.NewContextForRGBA(image.NewRGBA(image.Rect(0, 0, 64, 64)))
		dc.SetRGB(1, 1, 1)
		dc.Clear()

		drawTriangle(dc, Point{64 / 2, 64 / 2}, random(10.0, 30.0), 0.0)
		dc.SavePNG("./data/triangle" + strconv.Itoa(i) + ".png")
	}
}
