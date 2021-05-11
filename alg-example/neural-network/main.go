package main

import (
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
	dc.DrawCircle(random(15.0, 25.0), random(15.0, 25.0), random(5.0, 10.0))
	dc.SetRGB(0, 0, 0)
	dc.Fill()
}

func drawRect(dc *gg.Context, point Point, size float64) {
	dc.SetRGB(0, 0, 0)
	dc.DrawLine(point.X, point.Y, point.X+size, point.Y)
	dc.DrawLine(point.X, point.Y, point.X, point.Y+size)

	dc.DrawLine(point.X+size, point.Y+size, point.X+size, point.Y)
	dc.DrawLine(point.X+size, point.Y+size, point.X, point.Y+size)

	dc.Stroke()
}

func drawTriangle(dc *gg.Context, point1, point2, point3 Point) {
	dc.SetRGB(0, 0, 0)
	dc.DrawLine(point1.X, point1.Y, point2.X, point2.Y)
	dc.DrawLine(point1.X, point1.Y, point3.X, point3.Y)
	dc.DrawLine(point2.X, point2.Y, point3.X, point3.Y)
	dc.Stroke()
}

func main() {
	err := os.Mkdir("data", 0755)
	if err != nil {
		log.Panic(err)
	}

	for i := 0; i < 100; i++ {
		dc := gg.NewContext(64, 64)
		drawCircles(dc)
		dc.SavePNG("./data/circle" + strconv.Itoa(i) + ".png")

		dc = gg.NewContext(64, 64)
		drawRect(dc, Point{random(5.0, 25.0), random(5.0, 25.0)}, random(5.0, 10.0))
		dc.SavePNG("./data/square" + strconv.Itoa(i) + ".png")

		dc = gg.NewContext(64, 64)
		drawTriangle(dc, Point{random(5.0, 25.0), random(5.0, 25.0)},
			Point{random(5.0, 25.0), random(5.0, 25.0)},
			Point{random(5.0, 25.0), random(5.0, 25.0)})
		dc.SavePNG("./data/triangle" + strconv.Itoa(i) + ".png")
	}

}
