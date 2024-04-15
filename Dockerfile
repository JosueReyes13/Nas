FROM python:3.11.8

WORKDIR /.

COPY requirements.txt .

COPY . . 

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "main.py"]
