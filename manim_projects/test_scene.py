from manim import *


class TestScene(Scene):
    def construct(self):
        circle = Circle(color=BLUE)
        square = Square(color=RED)
        text = Text("Manim 測試成功!", font="Microsoft JhengHei")

        self.play(Create(circle))
        self.play(Transform(circle, square))
        self.play(FadeOut(circle))
        self.play(Write(text))
        self.wait()
