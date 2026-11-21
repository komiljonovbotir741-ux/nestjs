-- CreateTable
CREATE TABLE "teacher" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "teacher_phone_key" ON "teacher"("phone");
