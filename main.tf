provider "aws" {
  region = "ap-south-1"
}

# -------- Security Group --------
resource "aws_security_group" "react_sg" {
  name        = "react-sg"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------- EC2 Instance --------
resource "aws_instance" "react_server" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.micro"

  security_groups = [aws_security_group.react_sg.name]

  tags = {
    Name = "TerraformReactServer"
  }
}

# -------- Elastic IP --------
resource "aws_eip" "react_ip" {
  instance = aws_instance.react_server.id
}
